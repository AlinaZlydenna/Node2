function Space({length}) {
    let spaces = "";
    for (let i = 0, size = length ?? 0; i < size; i++) {
        spaces += "&nbsp;";
    }

    return (
        <div dangerouslySetInnerHTML={{__html: spaces}}>

        </div>
    );
}

export default Space;