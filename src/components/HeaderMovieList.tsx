import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 1.5,
    padding: 2,
    background: "linear-gradient(to right, #000000, #1a1a2e)",
    borderBottom: "2px solid #e50914",
  },
};

interface HeaderProps {
  title: string;
}

const Header = (headerProps: HeaderProps) => {
  const title = headerProps.title;

  return (
    <Paper component="div" sx={styles.root}>
      <Typography
        variant="h4"
        component="h3"
        sx={{
          color: "white",
          fontWeight: "bold",
          letterSpacing: 2,
        }}
      >
        {title}
      </Typography>
    </Paper>
  );
};

export default Header;