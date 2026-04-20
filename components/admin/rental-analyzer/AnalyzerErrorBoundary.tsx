"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

type Props = { children: ReactNode }

type State = { hasError: boolean; message?: string }

export class AnalyzerErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error?.message }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[RentalPropertyAnalyzer]", error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 text-sm text-amber-950">
          <p className="font-medium">Rental Property Analyzer could not load.</p>
          <p className="mt-2 text-amber-900/80">
            This is usually a chart layout timing issue or a browser extension blocking scripts. Try{" "}
            <strong>Try again</strong> below, then a hard refresh (Ctrl+Shift+R). Disable ad blockers for localhost if
            needed.
          </p>
          {this.state.message ? (
            <p className="mt-3 rounded-md bg-white/60 p-2 font-mono text-xs text-amber-950/90">{this.state.message}</p>
          ) : null}
          <button
            type="button"
            className="mt-4 rounded-lg border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-950 hover:bg-amber-100/80"
            onClick={() => this.setState({ hasError: false, message: undefined })}
          >
            Try again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
