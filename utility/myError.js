const MissingEntry = "Missing Entry";
const InvalidEntry = "Invalid Entry";

class myError
{
    constructor(type, value)
    {
        this.type = type;
        this.value = value;
    }
}

module.exports = {
    myError,
    MissingEntry,
    InvalidEntry
};