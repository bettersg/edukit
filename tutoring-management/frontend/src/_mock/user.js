import { faker } from '@faker-js/faker';
import { sample } from 'lodash';
import data from '../data/data.json'

// ----------------------------------------------------------------------
const {tutees} = data

const users = tutees.map((tutee, index) => ({
  id: faker.datatype.uuid(),
  name: tutee.name,
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  tutor: tutee.tutorName,
  noOfSessions: tutee.noOfSessions,
  levelSubject: tutee.levelSubject,
  organisation: tutee.organisation,
  location: tutee.location,
  strength: tutee.strength,
  weakness: tutee.weakness,
  tutorEmail: tutee.tutorEmail,
  tutorPhone: tutee.tutorPhone,
  tutorEndDate: tutee.tutorEndDate,
  sessionDate: tutee.sessionDate,
  sessionDescrip: tutee.sessionDescrip
}))

/*
const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.name.fullName(),
  company: faker.name.fullName(),
  isVerified: faker.datatype.boolean(),
  status: Math.floor(Math.random() * 10).toString(),
  role: sample(['P', 'S']).concat("", Math.floor(Math.random() * 4 + 1).toString(), " ", sample(['Math', 'Eng', 'Sci']))
}));

*/

export default users;
