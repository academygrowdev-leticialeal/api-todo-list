export class ExternalService {

    // Example of a simple constructor with no dependencies
    constructor() { }

    // Example of a simple logging method
    public async doLog(message: string): Promise<void> {
        console.log(message);
    }

    // Example of an external API call (simulated with a timeout)
    public async fetchExternalData(): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve("Data fetched from external API");
            }, 1000);
        });
    }
}
