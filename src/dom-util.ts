export function createDivInBodyWithId(id: string) {
    const div = document.createElement("div");
    div.id = id;
    document.body.appendChild(div);
}