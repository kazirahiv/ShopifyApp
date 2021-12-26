import React, { useState } from "react";
import { Heading, Page, Modal, Layout, EmptyState, TextContainer } from "@shopify/polaris";
import { ResourcePicker, TitleBar } from "@shopify/app-bridge-react";
const img =
  "https://cdn-icons.flaticon.com/png/512/1024/premium/1024776.png?token=exp=1640543112~hmac=0204fe187b64ea9bc2bf20ac09990499";

const Index = () => {
  var [open, setOpen] = useState(false);
  var [totalModalOpen, setTotalModalOpen] = useState(false);
  var [total, setTotal] = useState(0);

  var handle = (resource) => {
    setTotal(0);
    if (resource && resource.selection.length) {
      var total = 0;
      resource.selection.forEach((s) => {
        s.variants.forEach((t) => (total += parseInt(t.price)));
      });
      setTotal(total);
      setTotalModalOpen(true);
    }
  };

  return (
    <Page>
      <TitleBar
        primaryAction={{
          content: "Select products",
          onAction: () => setOpen(true),
        }}
      />
      <ResourcePicker // Resource picker component
        resourceType="Product"
        showVariants={false}
        open={open}
        onSelection={(resources) => handle(resources)}
        onCancel={() => setOpen(false)}
      />

      <Layout>
        <div style={{ maxHeight: 50, maxWidth: 50 }}>
          <EmptyState
            heading="Select and calculate total prices for products"
            action={{
              content: "Select products",
              onAction: () => setOpen(true),
            }}
            fullWidth={false}
            image={img}
          >
            <p>Select products to calculate total price !</p>
          </EmptyState>
        </div>
      </Layout>
      <Modal
        open={totalModalOpen}
        title="Total prices for selected products"
        primaryAction={{
          content: 'Okay',
          onAction: ()=> setTotalModalOpen(false),
        }}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              Total price - {total}$
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </Page>
  );
};

export default Index;
