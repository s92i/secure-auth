import { connect } from 'mongoose'

const connectDb = async () => {
    try {
        const uri: string | undefined = process.env.MONGODB_URI!
        const options: object = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await connect(uri, options).then(() =>
            console.log('Database connected')
        )
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
        console.log('Connection failed')
    }
}

export default connectDb
