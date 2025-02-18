import { create } from 'zustand';
import { Event, EventParticipant } from '../types/event.types';
import { EventService } from '../services/event.service';

interface EventState {
  events: Event[];
  selectedEvent: Event | null;
  participants: EventParticipant[];
  isLoading: boolean;
  error: string | null;
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
  setSelectedEvent: (event: Event | null) => void;
  setParticipants: (participants: EventParticipant[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  joinEvent: (eventId: string, userId: string) => Promise<void>;
  leaveEvent: (eventId: string, userId: string) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>, userId: string) => Promise<void>;
}

export const useEventStore = create<EventState>((set, get) => ({
  events: [],
  selectedEvent: null,
  participants: [],
  isLoading: false,
  error: null,
  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setParticipants: (participants) => set({ participants }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  joinEvent: async (eventId, userId) => {
    try {
      set({ isLoading: true });
      const participant = await EventService.joinEvent(eventId, userId);
      set((state) => ({
        participants: [...state.participants, participant],
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Katılım sırasında bir hata oluştu' });
    } finally {
      set({ isLoading: false });
    }
  },
  leaveEvent: async (eventId, userId) => {
    try {
      set({ isLoading: true });
      await EventService.leaveEvent(eventId, userId);
      set((state) => ({
        participants: state.participants.filter((p) => !(p.eventId === eventId && p.userId === userId)),
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Ayrılma sırasında bir hata oluştu' });
    } finally {
      set({ isLoading: false });
    }
  },
  updateEvent: async (id, event, userId) => {
    try {
      set({ isLoading: true });
      const updatedEvent = await EventService.updateEvent(id, event, userId);
      set((state) => ({
        events: state.events.map((e) => (e.id === id ? updatedEvent : e)),
        selectedEvent: updatedEvent,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Güncelleme sırasında bir hata oluştu' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
