import {convertHistoryMapToArray} from "./converter";

describe("converter tests", () => {
  test("placeholder", () => {
    const input = [
      {
        diagnosis: {
          control: {
            nodes_contributed_to_updates: {
              '{"id":"1ebf98b7-8d89-413e-957a-5b692c510d26","branch_id":"00ebddb4-16f8-43b7-bd9f-a03755f7ca03"}': 23,
              '{"id":"1ebf98b7-8d89-413e-957a-5b692c510d26","branch_id":"3cd75644-ac90-4765-a7bc-09bb40056efc"}': 23,
              '{"id":"1ebf98b7-8d89-413e-957a-5b692c510d26","branch_id":"4b09b3f9-d948-41cb-91fb-99324c4d597a"}': 23,
              '{"id":"1ebf98b7-8d89-413e-957a-5b692c510d26","branch_id":"8d5ede50-3aa5-42fb-8f2f-8d4fc416ebb1"}': 23,
              '{"id":"1ebf98b7-8d89-413e-957a-5b692c510d26","branch_id":"44f5f03a-fc69-42ce-a292-58dbae1c6abc"}': 23,
              '{"id":"1ebf98b7-8d89-413e-957a-5b692c510d26","branch_id":"64d80d0b-e308-44f2-9f3d-3795984906d0"}': 23,
              '{"id":"1ebf98b7-8d89-413e-957a-5b692c510d26","branch_id":"1189d66c-28ff-4694-94c9-d9532fc9ffe7"}': 23,
              '{"id":"1ebf98b7-8d89-413e-957a-5b692c510d26","branch_id":"c7260e09-4cb5-4bac-8255-b1a2b44ce8da"}': 23,
              '{"id":"1ebf98b7-8d89-413e-957a-5b692c510d26","branch_id":"d0becbaf-2dcb-4a98-8aaa-687d059218c8"}': 23,
              '{"id":"1ebf98b7-8d89-413e-957a-5b692c510d26","branch_id":"dac7c7d3-ee2e-484c-9c45-e5944c3f0960"}': 23,
              '{"id":"1ebf98b7-8d89-413e-957a-5b692c510d26","branch_id":"e6d7a75b-e989-4c3e-834d-19922b13fc2e"}': 23,
            },
          },
        },
      },
    ];

    convertHistoryMapToArray(input);
  });
});
