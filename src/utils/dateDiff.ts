export function calcDiffDays(initialDate: string) {
    let currentDate = new Date().toISOString().slice(0, 10);
    let parsedInitialDate = initialDate.slice(0, 10);
    const result = new Date(currentDate).valueOf() - new Date(parsedInitialDate).valueOf();
    const daysDiff = result / (1000 * 60 * 60 * 24);
    let monthsDiff = 0;
    let yearsDiff = 0;

    daysDiff >= 30 ? monthsDiff = Math.floor(daysDiff/30) : {};
    daysDiff >= 365 ? yearsDiff = Math.floor(daysDiff/365) : {};

    let lastUpdatedMessage = '';

    if (daysDiff >= 30 && daysDiff < 60) {
      lastUpdatedMessage = `Atualizado há ${monthsDiff} mês`;
    } else if (daysDiff >= 60 && daysDiff < 365) {
      lastUpdatedMessage = `Atualizado há ${monthsDiff} meses`;
    } else if (daysDiff >= 365 && daysDiff < 730) {
      lastUpdatedMessage = `Atualizado há ${yearsDiff} ano`;
    } else if (daysDiff >= 730) {
      lastUpdatedMessage = `Atualizado há ${yearsDiff} anos`;
    } else if (daysDiff === 1) {
      lastUpdatedMessage = `Atualizado há ${daysDiff} dia`;
    } else {
      lastUpdatedMessage = `Atualizado há ${daysDiff} dias`;
    }

    return lastUpdatedMessage;
  }