import "../assets/styles/foot.styl";

export default {
  data() {
    return {
      author: "Eric"
    };
  },
  render() {
    return (
      <div id="footer">
        <span>Written by {this.author}</span>
      </div>
    );
  }
};
