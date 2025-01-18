import ImageRead from "./ImageRead"
import { promises as fs } from 'fs'
import Color from "./Color";

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
        const image = await read(inputFile)
        console.log("done")


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

        // console.log(`width = ${width}, height = ${height}`)

        const colorTokens = tokens.slice(4) //Skipping max color value

        image = new ImageRead(width, height)

        let index = 0
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let color = new Color()

                color.red = parseInt(colorTokens[index])
                index++
                color.green = parseInt(colorTokens[index])
                index++
                color.blue = parseInt(colorTokens[index])
                index++

                image.set(x,y,color)
            }
        }
        return image

    } catch (error) {
        throw error
    }
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





