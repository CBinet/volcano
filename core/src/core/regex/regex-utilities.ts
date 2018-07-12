export class RegexUtilities {

    static extractGroups(regex: RegExp, text: string) {
        const groups: string[] = [];

        let m;
        // tslint:disable-next-line:no-conditional-assignment
        while ((m = regex.exec(text)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            m.forEach((match) => {
                groups.push(match);
            });
        }
        return groups;
    }
}