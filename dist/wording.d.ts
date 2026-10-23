import type { CaseId, ChannelId, StepState } from './model';
export interface Wording {
    title: string;
    steps: {
        livraison: string;
        traitement: string;
        parametrage: string;
    };
    channels: Record<ChannelId, string>;
    states: Record<StepState, string>;
    /** Message sous le chemin. `{date}` est remplacé par la date fournie au composant. */
    messages: Partial<Record<CaseId, string>>;
}
export declare const WORDING: Wording;
