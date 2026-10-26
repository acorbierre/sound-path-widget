export type StepState = 'done' | 'error' | 'scheduled' | 'pending';
/** Étapes macro, dans l'ordre d'affichage. */
export declare const STEP_IDS: readonly ["livraison", "traitement", "parametrage", "distribution"];
export type StepId = (typeof STEP_IDS)[number];
/** Les 3 canaux de l'étape « Distribution ». */
export declare const CHANNEL_IDS: readonly ["web", "app", "rss"];
export type ChannelId = (typeof CHANNEL_IDS)[number];
/** Cause du diagnostic : sert de clé au wording (message, libellés). */
export type CaseId = 'ok' | 'attente' | 'doublons' | 'doublon_nouveau' | 'remplacement_en_cours' | 'mid_non_conforme' | 'droits_fermes' | 'liberation_programmee';
export interface SoundPathDiagnostic {
    case: CaseId;
    steps: Record<Exclude<StepId, 'distribution'>, StepState>;
    channels: Record<ChannelId, StepState>;
}
