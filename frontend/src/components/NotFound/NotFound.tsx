
const NotFound = () => {
    return (
        <article className="flex flex-col justify-center items-center mt-96">
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flex-grow">
                <a href="/dashboard/overview">Visit Our Dashboard</a>
            </div>
        </article>
    )
}

export default NotFound