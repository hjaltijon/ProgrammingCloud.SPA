export class CodeExecutionResult {
    tests: Test[];

    ecounteredCompilerErrors: boolean | null;
    compilerErrors: Error[];
}

export class Test {
    success: boolean | null;
    expected: string;
    actual: string;
    input: string;
}

export class Error {
    location: string;
    message: string;
}