// @ts-ignore
import macIcon from "file-icon";
// @ts-ignore
import winIcon from "icon-extractor";

export async function extractIcon(path: string): Promise<string> {
    if (process.platform === 'darwin'){
        const buffer: Buffer = await macIcon.buffer(path);
        return "data:image/png;base64," + buffer.toString('base64')
    } else if (process.platform === 'win32') {
        return new Promise((resolve, reject)=>{
            let resolved = false;
            winIcon.emitter.on('icon', function(data: any){
                if (data.Context === path) {
                    resolved = true;
                    resolve("data:image/png;base64," + data.Base64ImageData);
                }
            })

            winIcon.getIcon(path, path);
            setTimeout(()=>{
                if (!resolved) {
                    reject();
                }
            }, 3000);
        });
    } else {
        throw new Error('Not implemented');
    }
}