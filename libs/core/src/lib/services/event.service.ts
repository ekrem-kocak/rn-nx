import { CreateEventDTO, Event, EventParticipant, ParticipantStatus } from '../types/event.types';
import { supabase } from '../config/supabase';

export class EventService {
  private static TABLE_NAME = 'events';
  private static PARTICIPANTS_TABLE = 'event_participants';

  static async createEvent(event: CreateEventDTO): Promise<Event> {
    try {
      const { data, error } = await supabase.from(this.TABLE_NAME).insert(event).select().single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('createEvent hatası:', error);
      throw error;
    }
  }

  static async getEvents(): Promise<Event[]> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select(
        `
        *,
        participants:${this.PARTICIPANTS_TABLE}(*)
      `,
      )
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async getEventById(id: string): Promise<Event> {
    const { data, error } = await supabase
      .from(this.TABLE_NAME)
      .select(
        `
        *,
        participants:${this.PARTICIPANTS_TABLE}(*)
      `,
      )
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateEvent(id: string, event: Partial<Event>, userId: string): Promise<Event> {
    const { data: existingEvent } = await supabase.from(this.TABLE_NAME).select().eq('id', id).single();

    if (existingEvent?.createdBy !== userId) {
      throw new Error('Bu etkinliği düzenleme yetkiniz yok');
    }

    const { data, error } = await supabase.from(this.TABLE_NAME).update(event).eq('id', id).select().single();

    if (error) throw error;
    return data;
  }

  static async joinEvent(eventId: string, userId: string): Promise<EventParticipant> {
    const { data, error } = await supabase
      .from(this.PARTICIPANTS_TABLE)
      .insert({
        eventId,
        userId,
        status: ParticipantStatus.ACCEPTED,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async leaveEvent(eventId: string, userId: string): Promise<void> {
    const { error } = await supabase.from(this.PARTICIPANTS_TABLE).delete().match({ eventId, userId });

    if (error) throw error;
  }

  static async getEventParticipants(eventId: string): Promise<EventParticipant[]> {
    const { data, error } = await supabase.from(this.PARTICIPANTS_TABLE).select('*').eq('eventId', eventId);

    if (error) throw error;
    return data;
  }

  static async uploadEventImage(uri: string): Promise<string> {
    try {
      const fileName = `${Math.random()}.jpg`;
      const filePath = `event-images/${fileName}`;

      // URI'den binary data oluştur
      try {
        const response = await fetch(uri);
        const binaryData = await response.arrayBuffer();

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('events')
          .upload(filePath, binaryData, {
            contentType: 'image/jpeg',
            cacheControl: '3600',
          });

        if (uploadError) {
          throw new Error(`Resim yüklenemedi: ${uploadError.message}`);
        }

        const { data: urlData } = supabase.storage.from('events').getPublicUrl(filePath);

        return urlData.publicUrl;
      } catch (uploadError) {
        if (uploadError instanceof Error) {
          console.error('Hata stack:', uploadError.stack);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Ana hata stack:', error.stack);
      }
      throw error;
    }
  }
}
