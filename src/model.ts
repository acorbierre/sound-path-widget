// Modèle du « Chemin du son » : partagé entre Qualipo (Superkaiser) et Atlas.
// Aucune dépendance : ni React, ni Tailwind, ni wording.

export type StepState = 'done' | 'error' | 'scheduled' | 'pending'

/** Étapes macro, dans l'ordre d'affichage. */
export const STEP_IDS = ['livraison', 'traitement', 'parametrage', 'distribution'] as const
export type StepId = (typeof STEP_IDS)[number]

/** Les 3 canaux de l'étape « Distribution ». */
export const CHANNEL_IDS = ['web', 'app', 'rss'] as const
export type ChannelId = (typeof CHANNEL_IDS)[number]

/** Cause du diagnostic : sert de clé au wording (message, libellés). */
export type CaseId =
  | 'ok'
  | 'attente'
  | 'doublons'
  | 'mid_non_conforme'
  | 'droits_fermes'
  | 'liberation_programmee'

export interface SoundPathDiagnostic {
  case: CaseId
  steps: Record<Exclude<StepId, 'distribution'>, StepState>
  channels: Record<ChannelId, StepState>
}
