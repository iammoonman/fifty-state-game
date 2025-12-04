// place files you want to import through the `$lib` alias in this folder.

export type ChallengeRecord = {
    challengerid: string;
    timestamp: Date;
    locationid: string;
    /** Should be the same as the locationid unless the player challenged from a neighboring state. */
    sourcelocationid: string;
    description: string;
    success: boolean;
    /** Any additional data gleaned from the description. Different per state to accomodate different challenges, if something is measurable. */
    challengemeta: any;
};

export type SlimChallengeRecord = {
    challengerid: string;
    locationid: string;
    challengemeta: any;
}