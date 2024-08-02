import bcrypt from "bcrypt";
export class Utils{
    static async comparePassword(candidatePassword:string, password:string):Promise<boolean>{
        return await bcrypt.compare(candidatePassword, password)
    }

    static convertYouTubeUrlToEmbed(url: string): string {
        const regex = /^.*(youtu.be\/|v\/|embed\/|watch\?v=|watch\?v%3D|watch\?v%3D|watch\?v%3D|watch\?v%3D|v%3D|v%2F|youtu.be\/|watch%3Fv%3D|watch%3Fv%3D)([^"&?\/\s]{11})/;
        const match = url.match(regex);
      
        if (match && match[2]) {
          return `https://www.youtube.com/embed/${match[2]}`;
        }
      
        return url;
      }
}