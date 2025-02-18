export interface Event {
  id?: string;
  title: string;
  description: string;
  address: string;
  date: string;
  time: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  participants?: EventParticipant[];
}

export interface EventParticipant {
  id: string;
  eventId: string;
  userId: string;
  status: ParticipantStatus;
  createdAt: string;
}

export enum ParticipantStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export interface CreateEventDTO extends Omit<Event, 'id' | 'createdAt' | 'updatedAt' | 'participants'> {}
