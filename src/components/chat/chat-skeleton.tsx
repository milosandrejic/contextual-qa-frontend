import {
  Box,
  Skeleton,
} from "@mui/material";

export function ChatSkeleton() {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: 0,
        overflowY: "hidden",
        px: { xs: 2, md: 4 },
        pb: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Skeleton variant="rounded" width={220} height={36} />
        </Box>

        <Box sx={{ display: "flex", gap: 1.25 }}>
          <Skeleton variant="circular" width={22} height={22} />

          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Skeleton variant="text" width="92%" />
            <Skeleton variant="text" width="86%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rounded" width={120} height={20} sx={{ mt: 1 }} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Skeleton variant="rounded" width={180} height={36} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Skeleton variant="rounded" width={220} height={36} />
        </Box>

        <Box sx={{ display: "flex", gap: 1.25 }}>
          <Skeleton variant="circular" width={22} height={22} />

          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Skeleton variant="text" width="92%" />
            <Skeleton variant="text" width="86%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rounded" width={120} height={20} sx={{ mt: 1 }} />
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Skeleton variant="rounded" width={180} height={36} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Skeleton variant="rounded" width={220} height={36} />
        </Box>

        <Box sx={{ display: "flex", gap: 1.25 }}>
          <Skeleton variant="circular" width={22} height={22} />

          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 0.75 }}>
            <Skeleton variant="text" width="92%" />
            <Skeleton variant="text" width="86%" />
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="rounded" width={120} height={20} sx={{ mt: 1 }} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
