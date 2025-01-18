import ImageRead from "./ImageRead"
import { promises as fs } from 'fs'

const test = () => {
}

const run = async () => {
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
        const image: ImageRead = await read(inputFile)


    } catch (error) {
        console.error(error)
    }
}

const usage = () => {
    console.log(`USAGE: node dist/ImageEditor.js <in-file> <out-file> <grayscale|invert|emboss|motionblur> {motion-blur-length}`)
}

const read = async (filePath: string): Promise<ImageRead> => {
    let image = null

    try {
        let data = await fs.readFile(filePath)
        let dataString = data.toString()
        dataString = dataString.replace(/\s+/g, ' ').trim();
        const tokens = dataString.split(" ")

        const width = parseInt(tokens[1])
        const height = parseInt(tokens[2])

        const colorTokens = tokens.slice(4) //Skipping max color value

        image = new ImageRead(width, height)

    } catch (error) {
        console.error(error)
    }

    // return image
    return new ImageRead(2, 2)
}



function print2DArray<T>(array: T[][]): void {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
            console.log(array[i][j]);
        }
    }
}




run()
// test()





