import ImageRead from "./ImageRead"
import Color from "./Color";

const test = () => {
    const test: ImageRead = new ImageRead(2, 5)
}

const run = () => {
    const args = process.argv.splice(2)
    try {
        if (args.length < 3) {
            usage()
            process.exit(1)
        }

        const inputFile = args[0]
        const outputFile = args[1]
        const filter = args[2]

        //TODO: build read() function
        // const image: Image = read(inputFile)



    } catch(error) {
        console.error(error)
    }
}

const usage = () => {
    console.log(`USAGE: node dist/ImageEditor.js <in-file> <out-file> <grayscale|invert|emboss|motionblur> {motion-blur-length}`)
}

function print2DArray<T>(array: T[][]): void {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            console.log(array[i][j]);
        }
    }
}




// run()
test()





