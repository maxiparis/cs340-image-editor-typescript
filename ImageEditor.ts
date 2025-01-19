import ImageRead from "./ImageRead"
import { promises as fs } from 'fs'
import Color from "./Color";

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

        const image = await read(inputFile)
        console.log("done reading")

        if (filter === "grayscale" || filter === "greyscale") {
            if (args.length != 3) {
                usage();
                return
            }
            grayscale(image)
            console.log("grayscale")
        } else if (filter === "invert") {
            if (args.length != 3) {
                usage();
                return
            }
            invert(image)
            console.log("invert")
        } else if (filter === "emboss") {
            if (args.length != 3) {
                usage();
                return
            }
            //TODO: working here
            emboss(image)
            console.log("emboss")
        } else if (filter === "motionblur") {
            if (args.length != 4) {
                usage()
                return
            }


            //Make sure we have a number as a string
            let length: number = -1
            if (Number(args[3])) {
                length = parseInt(args[3])
            } else {
                usage()
                return
            }


            if (length < 0) {
                usage()
                return
            }

            // motionblur(image, length)
            console.log("motionblur")
        } else {
            usage()
        }

        await write(image, outputFile)
        console.log("done writing")
    } catch (error) {
        console.error(error)
    }
}

function usage() {
    console.log(`USAGE: node dist/ImageEditor.js <in-file> <out-file> <grayscale|invert|emboss|motionblur> {motion-blur-length}`)
}

function emboss(image: ImageRead) {
    for(let x = image.getWidth() - 1; x >= 0; x--) {
        for(let y = image.getHeight() - 1; y >= 0; y--) {
            let curColor: Color = image.get(x, y)

            let diff: number = 0
            if (x > 0 && y > 0) {
                let upLeftColor = image.get(x - 1, y - 1);
                if (Math.abs(curColor.red - upLeftColor.red) > Math.abs(diff)) {
                    diff = curColor.red - upLeftColor.red;
                }
                if (Math.abs(curColor.green - upLeftColor.green) > Math.abs(diff)) {
                    diff = curColor.green - upLeftColor.green;
                }
                if (Math.abs(curColor.blue - upLeftColor.blue) > Math.abs(diff)) {
                    diff = curColor.blue - upLeftColor.blue;
                }
            }

            let grayLevel: number = (128 + diff)
            grayLevel = Math.max(0, Math.min(grayLevel, 255))

            curColor.red = grayLevel
            curColor.blue = grayLevel
            curColor.green = grayLevel
        }
    }
}

function invert(image: ImageRead) {
    for (let x = 0; x < image.getWidth(); x++) {
        for (let y = 0; y < image.getHeight(); y++) {
            const curColor = image.get(x, y)

            curColor.red = 255 - curColor.red
            curColor.blue = 255 - curColor.blue
            curColor.green = 255 - curColor.green
        }
    }
}


function grayscale(image: ImageRead) {
    for (let x = 0; x < image.getWidth(); x++) {
        for (let y = 0; y < image.getHeight(); y++) {
            const curColor = image.get(x, y)
            let grayLevel = Math.floor((curColor.red + curColor.green + curColor.blue) / 3)
            grayLevel = Math.max(0, Math.min(grayLevel, 255))

            curColor.red = grayLevel
            curColor.green = grayLevel
            curColor.blue = grayLevel
        }
    }
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

const write = async (image: ImageRead, filePath: string) => {
    try {
        let data = `P3\n`
        data += `${image.getWidth()} ${image.getHeight()}\n`
        data += `255\n`

        for (let y = 0; y < image.getHeight(); y++) {
            for (let x = 0; x < image.getWidth(); x++) {
                const color = image.get(x, y)
                let toAdd = ""
                if (x != 0) {
                    toAdd = " "
                }

                toAdd += `${color.red} ${color.green} ${color.blue}`
                data += `${toAdd}`
            }
            data += "\n"
        }

        console.log("Data: ")
        console.log(data)
        await fs.writeFile(filePath, data)
    } catch (error) {
        throw error
    }
}

run()





