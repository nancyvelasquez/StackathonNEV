export const updateCanvasSize = () => {
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

    this.setState({
        width,
        height
    });
}