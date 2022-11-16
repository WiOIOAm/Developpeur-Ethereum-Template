import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { Box, Tab, Grid, Container } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

// docs
import votingFile from "../docs/Voting.md";
import contextFile from "../docs/Context.md";
import ownableFile from "../docs/Ownable.md";
// ----------------------------------------------------------------------

export default function DocumentationPage() {
  const [value, setValue] = useState("1");

  const [votingMarkdown, setVotingMarkdown] = useState("");
  const [contextMarkdown, setContextMarkdown] = useState("");
  const [ownableMarkdown, setOwnableMarkdown] = useState("");

  useEffect(() => {
    fetch(votingFile)
      .then((res) => res.text())
      .then((md) => {
        setVotingMarkdown(md);
      });
    fetch(contextFile)
      .then((res) => res.text())
      .then((md) => {
        setContextMarkdown(md);
      });
    fetch(ownableFile)
      .then((res) => res.text())
      .then((md) => {
        setOwnableMarkdown(md);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title> Documentation | Easy Voting DApp </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="Voting Documentation"
                >
                  <Tab label="Voting" value="1" />
                  <Tab label="Ownable" value="2" />
                  <Tab label="Context" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                {!!votingMarkdown.length && (
                  <ReactMarkdown
                    escapeHtml={false}
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                  >
                    {votingMarkdown}
                  </ReactMarkdown>
                )}
              </TabPanel>
              <TabPanel value="2">
                {!!contextMarkdown.length && (
                  <ReactMarkdown
                    escapeHtml={false}
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                  >
                    {contextMarkdown}
                  </ReactMarkdown>
                )}
              </TabPanel>
              <TabPanel value="3">
                {!!ownableMarkdown.length && (
                  <ReactMarkdown
                    escapeHtml={false}
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                  >
                    {ownableMarkdown}
                  </ReactMarkdown>
                )}
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
