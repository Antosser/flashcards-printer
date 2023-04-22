$("#go").on("click", () => {
    $.get($("#path").val() as string, (data: string) => {
        let pairs: string[][] = [];

        data.split("\n").forEach((v, i) => {
            const pair = v.split($("#seperator").val() as string);
            if (pair.length == 2) {
                pairs.push(pair);
            } else {
                throw "LOL pair is not lenght 2: " + i;
            }
        });
        pairs.sort(() => Math.random() - 0.5);

        let pages: string[][][] = [];

        const chunkSize = 24;
        for (let i = 0; i < pairs.length; i += chunkSize) {
            const chunk = pairs.slice(i, i + chunkSize);
            pages.push(chunk);
        }

        let tables: string[][] = [];

        pages.forEach((v) => {
            let questions: string[] = [];
            let answers: string[] = [];

            v.forEach((w) => {
                questions.push(w[0]);
                answers.push(w[1]);
            });
            for (let i = 0; i < (v.length % 4 == 0 ? 0 : 4 - (v.length % 4)); i++) {
                questions.push("");
                answers.push("");
            }

            tables.push(questions);

            let answerTable: string[] = [];

            const chunkSize = 4;
            for (let i = 0; i < answers.length; i += chunkSize) {
                const chunk = answers.slice(i, i + chunkSize);
                chunk.reverse();
                answerTable.push(...chunk);
            }

            tables.push(answerTable);
        });

        console.log(tables);

        $("#grids").empty();
        tables.forEach((table) => {
            let tableElement = $('<div class="grid"></div>');

            table.forEach((item) => {
                tableElement.append(`<div>${item}</div>`);
            });
            $("#grids").append(tableElement);
        });
    });
});
