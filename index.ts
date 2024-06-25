const image: {width: number, height: number, icons: string[], colors: string[], bgcolor: string, frontcolor: string, fontsize: number, dotsize: number} = {
    width: 7680,
    height: 2160,
    icons: ['\uf121', '\uf6ff', '\uf2db', '\uf188', '\uf120', '\uf130', '\uf001', '\uf8d9', '\uf538', '\uf0eb', '\uf54a', '\uf0ad', '\uf0f4', '\uf2b4', '\uf386', '\uf5fc', '\uf11c', '\uf7b6', '\uf390', '\uf02f', '\uf007', '\uf019', '\uf013', '\uf025', '\uf1eb', '\uf11b', '\ue13a', '\uf1c0', '\uf233', '\uf011', '\uf0e8', '\uf1c9', '\ue13b'],
    colors: ["#ffd866", "#a9dc76", "#fc9867", "#ab9df2", "#ff6188", "#78dce8"],
    bgcolor: "#2e2e2e",
    frontcolor: "#797979",
    fontsize: 36,
    dotsize: 48,
}

class Icon {
    icon: string;
    bgcolor: string;
    xCoord: number;
    yCoord: number;

    constructor() {
        this.icon = image.icons[Math.floor(Math.random() * image.icons.length)];

        //set Coordinates
        do {
            var collision = false;
            this.xCoord = Math.round(Math.random() * image.width);
            this.yCoord = Math.round(Math.random() * image.height);
            
            let xMin = this.xCoord - 40;
            let xMax = this.xCoord + 40;
            let yMin = this.yCoord - 40;
            let yMax = this.yCoord + 40;

            for (let i = 0; i < Dots.length; i++) {
                let dot = Dots[i];
                let xDistance = Math.abs(this.xCoord - dot.xCoord);
                let yDistance = Math.abs(this.yCoord - dot.yCoord);

                //Check if distance between Dots is 70 pixels
                if (xDistance < (image.dotsize * 2.2) && yDistance < (image.dotsize * 2.2)) {
                    collision = true;
                    break;
                }
            }
        } while(collision);

        //set BackgroundColor
        if(Math.random() < 0.3){
            this.bgcolor = image.colors[Math.round(Math.random() * image.colors.length) - 1];
        }
        else this.bgcolor = image.frontcolor;
    }

    draw(ctx: CanvasRenderingContext2D){
        ctx.fillStyle = this.bgcolor;
        ctx.beginPath();
        ctx.arc(this.xCoord, this.yCoord, image.dotsize, 0, 2*Math.PI);
        ctx.fill();

        ctx.fillStyle = image.bgcolor;
        ctx.font = `${image.fontsize}px "FontAwesome"`;

        let xOffset = ctx.measureText(this.icon).width;
        let yOffset = image.fontsize * (3 / 4); //Fontsize * 3/4

        ctx.fillText(this.icon, this.xCoord - (xOffset / 2), this.yCoord + (yOffset / 2));
    }
}

interface Array<T> {
    generateImage: (ctx: any, number: number) => void;
}

Array.prototype.generateImage = function(ctx, number){
    for(let i = 0; i < number; i++){
        this.push(new Icon());
        this[i].draw(ctx);
    }
}

const Dots: Icon[] = [];

window.onload = () => {
    const canvas = document.getElementById('background') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    if(ctx){
        ctx.fillStyle = image.bgcolor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        Dots.generateImage(ctx, 250);
    }

    const downloadBtn = document.getElementById('btn_download') as HTMLButtonElement;
    downloadBtn.addEventListener('click', () => {
        if (canvas) {
            // Konvertiere das Canvas zu einem Data-URL-Bild
            const imageUrl = canvas.toDataURL('image/jpg', 1);

            // Erstelle ein temporäres <a>-Element für den Download
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = 'canvas-image.jpg';
            link.click();
        }
    });
};