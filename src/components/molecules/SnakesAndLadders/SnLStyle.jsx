const ROW_SIZE = 10
const COL_SIZE = 10

const backgroundStyle = {
    height: "500px",
    width: "500px",
    borderStyle: "solid",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "2px",
    display: 'grid',
    gridTemplateRows: `repeat(${ROW_SIZE}, 1fr)`,
    gridTemplateColumns: `repeat(${COL_SIZE}, 1fr)`,
    gridGap: "1px"
}

const ball = {
    height: "20px",
    width: "20px",
    borderRadius: "50%",
    display: "inline-block",
    backgroundColor: "yellow",
}

const other = {
    justifyContent: "center",
    backgroundColor: "#ececec",
}

const textInBox = {
    textAlign: "left",
    fontSize: "10px",
}