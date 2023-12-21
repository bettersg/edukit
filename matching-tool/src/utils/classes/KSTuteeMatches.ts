import { Tutee, Tutor } from '@/types/person';
import { getKSMatchScore } from '../KSscore';
import {
  MatchingList,
  TuteeSummary,
  TutorMatchSummary,
} from '@/types/globalVariables';

class TuteeMatches {
  public matchingList: MatchingList = [];
  constructor(tutorParsedData: Tutor[], tuteeParsedData: Tutee[]) {
    this.matchingList = this.calculateMatches(tutorParsedData, tuteeParsedData);
  }
  private calculateMatches(tutorParsedData: Tutor[], tuteeParsedData: Tutee[]) {
    const matchingList: MatchingList = [];
    for (let tutee of tuteeParsedData) {
      const tuteeMatches: {
        tutee: TuteeSummary;
        tutorMatches: TutorMatchSummary[];
      } = {
        tutee: {
          index: tutee.personalData.index ?? 0,
          name: tutee.personalData.name ?? 'no data',
        },
        tutorMatches: [],
      };
      for (let tutor of tutorParsedData) {
        const tutorMatchingScoreObj = {
          index: tutor.personalData.index,
          contactNum: tutor.personalData.contact?.phone,
          name: tutor.personalData.name,
          matchingScore: getKSMatchScore(tutor, tutee),
        };
        tuteeMatches.tutorMatches.push(tutorMatchingScoreObj);
      }
      tuteeMatches.tutorMatches.sort((a, b) => {
        if (!a.matchingScore || !b.matchingScore) {
          return 0;
        }
        return b.matchingScore - a.matchingScore;
      });
      if (tuteeMatches.tutorMatches.length > 51) {
        tuteeMatches.tutorMatches = tuteeMatches.tutorMatches.slice(0, 50);
      }
      matchingList.push(tuteeMatches);
    }
    return matchingList;
  }
}

export default TuteeMatches;
