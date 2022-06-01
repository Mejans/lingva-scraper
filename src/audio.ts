import { mapGoogleCode, LanguageType, LangCode } from "./utils/language";
import request, { Endpoint } from "./utils/request";

export const getAudio = (lang: LangCode, text: string) => {
    const parsedLang = mapGoogleCode(LanguageType.TARGET, lang);

    const lastSpace = text.lastIndexOf(" ", 200);
    const slicedText = text.slice(0, text.length > 200 && lastSpace !== -1 ? lastSpace : 200);

    return request(Endpoint.AUDIO)
        .with({ lang: parsedLang, text: slicedText })
        .doing(({ data }) => data ? Array.from(new Uint8Array(data)) : null);
};