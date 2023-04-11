import "../styles/tokens-grid.css"

interface TokensGridProps {
  tokens: Record<string, string>;
  hasRem?: boolean;
}

export function TokensGrid({ hasRem = false, tokens }: TokensGridProps) {
  return (
    <table className="tokens-grid">
      <thead>
        <tr>
          <th>Name</th>
          <th>Valeu</th>
          {hasRem && <th>Pixels</th>}
        </tr>
      </thead>

      <tbody>
        {Object.entries(tokens).map(([key, value]) => {
          return (
            <tr>
              <td>{key}</td>
              <td>{value}</td>
              {hasRem && <td>{Number(value.replace("rem", "")) * 16}px</td>}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
