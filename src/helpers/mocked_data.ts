import * as faker from "faker";

enum ChoiceType {
  RACE = 0,
  RANDOM = 1,
  MANUAL = 2,
}

enum ApplicationState {
  WAITING = 0,
  ACCEPTED = 1,
  REJECTED = 2,
}

interface User {
  id: number;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

interface Meetup {
  id: number;
  title: string;
  owner_id: number;
  summary: string;
  started_at: Date;
  ended_at?: Date;
  choice_type: ChoiceType;
  content: string;
  location: string;
  created_at: Date;
  updated_at: Date;
}

interface Application {
  meetup_id: number;
  user_id: number;
  state: ApplicationState;
  created_at: Date;
}

export class MockedDataFactory {
  public static meetup(): Meetup {
    const startedAt = Math.max(1504969200000, Math.random() * 1514732399000);
    const endedAt = startedAt + (Math.random() * 1000 * 86400);

    return {
      id: faker.random.number(),
      title: faker.lorem.sentence(),
      owner_id: faker.random.number(),
      summary: faker.lorem.paragraph(),
      started_at: new Date(startedAt),
      ended_at: new Date(endedAt),
      choice_type: faker.random.arrayElement<ChoiceType>([
        ChoiceType.MANUAL,
        ChoiceType.RACE,
        ChoiceType.RANDOM,
      ]),
      content: faker.lorem.sentences(),
      location: faker.address.streetAddress(true),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  public static user(): User {
    return {
      id: faker.random.number(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
