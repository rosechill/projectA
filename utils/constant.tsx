export const stringToNumber = (value: string): number => {
    const numericString = value.replace(/[^0-9.-]+/g, '');

    const numberValue = parseFloat(numericString);

    return numberValue;
};

export const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(stringToNumber(amount));
};

