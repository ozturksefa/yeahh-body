import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: 24, margin: 12, background: "#1a0000",
          border: "1px solid #D41920", borderRadius: 10, color: "#fff"
        }}>
          <div style={{ fontWeight: 700, color: "#FF5252", marginBottom: 8 }}>
            ⚠ Bir hata oluştu
          </div>
          <div style={{ fontSize: 12, color: "#aaa", marginBottom: 12, fontFamily: "monospace" }}>
            {this.state.error.message}
          </div>
          <button
            onClick={() => this.setState({ error: null })}
            style={{
              padding: "8px 16px", background: "#D41920", border: "none",
              borderRadius: 6, color: "#fff", cursor: "pointer", fontFamily: "inherit"
            }}>
            Tekrar Dene
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
