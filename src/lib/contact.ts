// Limites de tamanho do formulário de contato (usados no front e validados na API)
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

export const CONTACT_MIN_MESSAGE_LENGTH = 10;
