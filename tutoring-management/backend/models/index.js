const User = require('./user')
const Tutee = require('./tutee')
const Tutor = require('./tutor')
const Pairing = require('./pairing')
const Session = require('./session')
const Subject = require('./subject')
const SubjectPairing = require('./subjectPairing')
const WaitingList = require('./waitingList')

Pairing.belongsTo(User)
User.hasMany(Pairing)

Tutee.belongsToMany(Tutor, { through: Pairing })
Tutor.belongsToMany(Tutee, { through: Pairing })

Pairing.belongsTo(Tutee)
Tutee.hasMany(Pairing)

Pairing.belongsTo(Tutor)
Tutor.hasMany(Pairing)

Pairing.belongsToMany(Subject, { through: SubjectPairing })
Subject.belongsToMany(Pairing, { through: SubjectPairing })

Session.belongsTo(Pairing)
Pairing.hasMany(Session)

module.exports = {
  User,
  Tutee,
  Tutor,
  Pairing,
  Session,
  Subject,
  SubjectPairing,
  WaitingList
}