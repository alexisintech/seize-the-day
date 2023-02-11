<Box display="flex" justifyContent="space-between" alignItems="center">
  <Header title="PROFILE" subtitle={`Welcome ${user}!`} />
</Box>;

{
  /* GRID & CHARTS */
}
<Box
  display="grid"
  gridTemplateColumns="repeat(12, 1fr)"
  gridAutoRows="140px"
  gap="20px"
>
  {/* ROW 1 */}
  <Box
    gridColumn="span 12"
    backgroundColor={colors.primary[400]}
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Typography
      variant="h4"
      sx={{
        textAlign: "center",
        fontWeight: 300,
        fontStyle: "italic",
        px: 10,
      }}
    >
      "{quote}"
    </Typography>
  </Box>

  {/* ROW 2 */}
  <Box
    gridColumn="span 4"
    gridRow="span 2"
    backgroundColor={colors.primary[400]}
    p="30px"
  >
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
    >
      <Clock />
    </Box>
  </Box>
  <Box
    gridColumn="span 4"
    gridRow="span 2"
    backgroundColor={colors.primary[400]}
  >
    <Calendar />
  </Box>
  <Box
    gridColumn="span 4"
    gridRow="span 2"
    backgroundColor={colors.primary[400]}
    padding="15px"
  >
    <Weather />
  </Box>
</Box>;
