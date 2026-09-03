class ApiError extends Error{
    constructor(
        statuscode,
        message = "SomeThing went wrong", 
        errors=[],
        statck = ""
    )
    {   
        super(message)
        this.statuscode = statuscode;
        this.message = message;
        this.errors = errors;
        this.data = null;
        this.success = false;

        if(statck){
            this.stack = statck;
        }else{
            Error.captureStackTrace(this,this.constructor)
        }

    }
}

export {ApiError}