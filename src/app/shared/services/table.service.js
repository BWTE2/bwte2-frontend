class TableService {

    constructor() {
    }


    getIconButton(id, faType) {
        const iconButton = document.createElement("BUTTON");
        iconButton.setAttribute("id", id);
        const icon = document.createElement("I");
        icon.classList = ('fas ' + faType);
        iconButton.append(icon);
        return iconButton;
    }


    getColumn(text) {
        const column = document.createElement("TD");
        column.innerText = text;
        return column;
    }

    getRow(columns) {
        const row = document.createElement("TR")
        columns.forEach((column) => {
            row.appendChild(column);
        });
        return row;
    }

    getEmptyTablePlaceholder(message) {
        const el = document.createElement("td");
        el.innerText = message;
        el.setAttribute("colspan", 3);
        el.classList.add("empty-table")
        return el;
    }

}

export const tableService = new TableService();
