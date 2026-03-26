import type { Project, Vote, CategoryScore, Scores } from './types';

const NORMAL_VOTER_POINTS = 1;
const JUDGE_POINTS = 5;

export function calculateScores(projects: Project[], votes: Vote[]): Scores {
  const normalVoters = votes.filter((v) => v.voterType === 'normal');
  const judges = votes.filter((v) => v.voterType === 'judge');

  const calcCategory = (getter: (v: Vote) => string): CategoryScore[] =>
    projects
      .map((project) => {
        const nv = normalVoters.filter((v) => getter(v) === project.id).length;
        const jv = judges.filter((v) => getter(v) === project.id).length;
        const score = nv * NORMAL_VOTER_POINTS + jv * JUDGE_POINTS;
        return {
          projectId: project.id,
          projectName: project.projectName,
          teamName: project.teamName,
          score,
          normalVotes: nv,
          judgeVotes: jv,
        };
      })
      .sort((a, b) => b.score - a.score);

  return {
    mostInnovative: calcCategory((v) => v.mostInnovative),
    bestBusinessValue: calcCategory((v) => v.bestBusinessValue),
    mostLiked: calcCategory((v) => v.mostLiked),
    totalNormalVoters: normalVoters.length,
    totalJudges: judges.length,
  };
}
