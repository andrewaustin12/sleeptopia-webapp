import { renderToString } from "react-dom/server";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import Config from "../../../config";

type FeatureRequestEmailProps = {
  username: string;
  request: string;
  tag: string;
};

export function FeatureRequestEmail({ username, request, tag }: FeatureRequestEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {tag ? `[${tag}] Request from ${username}` : `New Feature Request from ${username}`}
      </Preview>
      <Body style={{
        backgroundColor: "#ffffff",
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
      }}>
        <Container style={{ padding: "20px", maxWidth: "600px" }}>
          <Heading style={{ color: "#2563eb", marginBottom: "24px" }}>
            {tag ? `New ${tag} Request Submitted` : "New Feature Request Submitted"}
          </Heading>

          <Section style={{ marginBottom: "24px" }}>
            <Text style={{ fontSize: "16px", margin: "0 0 8px" }}>
              <strong>Submitted by:</strong> {username}
            </Text>
            <Text style={{ fontSize: "16px", margin: "0 0 8px" }}>
              <strong>Category:</strong> {tag}
            </Text>
          </Section>

          <Section style={{ backgroundColor: "#f3f4f6", padding: "20px", borderRadius: "8px", marginBottom: "24px" }}>
            <Heading as="h2" style={{ color: "#1f2937", marginTop: "0", fontSize: "18px" }}>
              Request Details
            </Heading>
            <Text style={{ margin: "0", lineHeight: "1.5" }}>
              {request}
            </Text>
          </Section>

          <Section style={{ marginBottom: "32px" }}>
            <Text style={{ fontSize: "16px", marginBottom: "16px" }}>
              This request is currently marked as <strong>pending</strong> and needs your review.
            </Text>
            <Text style={{ fontSize: "16px" }}>
              You can:
              <ul style={{ margin: "8px 0", paddingLeft: "20px" }}>
                <li>Set a priority level</li>
                <li>Update the status</li>
                <li>Add admin notes</li>
                <li>Track votes and engagement</li>
              </ul>
            </Text>
          </Section>

          <Link
            href={`https://${Config.domainName}/admin`}
            style={{
              display: "inline-block",
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px 24px",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "bold",
            }}
          >
            Review in Admin Dashboard →
          </Link>

          <Text style={{ fontSize: "14px", color: "#6b7280", marginTop: "32px" }}>
            This is an automated message from {Config.appName}. Please do not reply to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

export function renderFeatureRequestEmail(props: FeatureRequestEmailProps) {
  return renderToString(<FeatureRequestEmail {...props} />);
}

