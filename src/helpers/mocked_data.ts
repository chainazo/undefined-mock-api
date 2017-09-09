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
  display_name: string;
  email: string;
  phone: string;
  created_at: Date;
  updated_at: Date;
}

interface Meetup {
  id: number;
  title: string;
  owner_id: number;
  cover_image_url: string;
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

const COVER_IMAGE_URLS = [
  "https://scontent-hkg3-1.cdninstagram.com/t51.2885-15/e35/21373777_265951770560950_4807312218162987008_n.jpg",
  "https://scontent-hkg3-1.cdninstagram.com/t51.2885-15/e35/21372489_1542726739104056_5041615435917688832_n.jpg",
  "https://scontent-hkg3-1.cdninstagram.com/t51.2885-15/e35/21435661_116842598959858_8392253954787901440_n.jpg",
  "https://scontent-hkg3-1.cdninstagram.com/t51.2885-15/e35/21480503_117076612328817_8707513663939936256_n.jpg",
  "https://scontent-hkg3-1.cdninstagram.com/t51.2885-15/e35/21372027_122381895164827_5593194167070097408_n.jpg",
]

export class MockedDataFactory {
  public static meetup(): Meetup {
    const startedAt = Math.max(1504969200000, Math.random() * 1514732399000);
    const endedAt = startedAt + (Math.random() * 1000 * 86400);

    return {
      id: faker.random.number(),
      title: faker.lorem.sentence(),
      owner_id: faker.random.number(),
      cover_image_url: faker.random.arrayElement<string>(COVER_IMAGE_URLS),
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
      display_name: faker.internet.userName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
