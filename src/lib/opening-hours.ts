// Horaires : Lun-Ven 8h-17h · Sam 8h-12h · Dim fermé
export interface OpeningStatus {
  isOpen: boolean;
  label: string; // ex: "OUVERT MAINTENANT — Sans rendez-vous"
  short: string; // ex: "Ouvre demain à 8h"
}

export function getOpeningStatus(now: Date = new Date()): OpeningStatus {
  // Convertir en timezone Europe/Paris
  const parisDate = new Date(
    now.toLocaleString("en-US", { timeZone: "Europe/Paris" })
  );
  const day = parisDate.getDay(); // 0 = dim, 6 = sam
  const hour = parisDate.getHours();
  const minute = parisDate.getMinutes();
  const time = hour + minute / 60;

  // Lundi à vendredi (1-5)
  if (day >= 1 && day <= 5) {
    if (time >= 8 && time < 17) {
      return {
        isOpen: true,
        label: "Ouvert maintenant — Sans rendez-vous",
        short: "Ouvert maintenant",
      };
    }
    if (time < 8) {
      return {
        isOpen: false,
        label: "Ouvre aujourd'hui à 8h",
        short: "Ouvre à 8h",
      };
    }
    // après 17h
    if (day === 5) {
      return {
        isOpen: false,
        label: "Ouvre demain à 8h (samedi)",
        short: "Ouvre demain à 8h",
      };
    }
    return {
      isOpen: false,
      label: "Ouvre demain à 8h",
      short: "Ouvre demain à 8h",
    };
  }

  // Samedi (6)
  if (day === 6) {
    if (time >= 8 && time < 12) {
      return {
        isOpen: true,
        label: "Ouvert maintenant — Sans rendez-vous",
        short: "Ouvert maintenant",
      };
    }
    if (time < 8) {
      return {
        isOpen: false,
        label: "Ouvre aujourd'hui à 8h",
        short: "Ouvre à 8h",
      };
    }
    return {
      isOpen: false,
      label: "Ouvre lundi à 8h",
      short: "Ouvre lundi à 8h",
    };
  }

  // Dimanche
  return {
    isOpen: false,
    label: "Ouvre lundi à 8h",
    short: "Ouvre lundi à 8h",
  };
}
