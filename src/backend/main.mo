import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Blob "mo:core/Blob";
import Runtime "mo:core/Runtime";
import MixinStorage "blob-storage/Mixin";
import Order "mo:core/Order";

actor {
  include MixinStorage();

  type GiftPage = {
    id : Text;
    owner : Principal;
    tldr : Text;
    mainTitle : Text;
    mainBlob : Blob;
    dateHint : Text;
    createdAt : Time.Time;
    collagePositions : [(Nat, Nat, Blob)];
  };

  module GiftPage {
    public func compare(giftPage1 : GiftPage, giftPage2 : GiftPage) : Order.Order {
      Text.compare(giftPage1.id, giftPage2.id);
    };
  };

  let giftPages = Map.empty<Text, GiftPage>();

  func generateGiftId(caller : Principal) : Text {
    caller.toText().concat(Time.now().toText());
  };

  public shared ({ caller }) func saveGiftPage(
    tldr : Text,
    mainTitle : Text,
    mainBlob : Blob,
    dateHint : Text,
    collagePositions : [(Nat, Nat, Blob)],
  ) : async Text {
    let giftId = generateGiftId(caller);
    let newRecord : GiftPage = {
      owner = caller;
      id = giftId;
      tldr;
      mainBlob;
      mainTitle;
      createdAt = Time.now();
      collagePositions;
      dateHint;
    };
    giftPages.add(giftId, newRecord);
    giftId;
  };

  public query ({ caller }) func getGiftPageIdsAndTitlesByOwner(owner : Principal) : async [(Text, Text)] {
    giftPages.values().toArray().sort().filter(
      func(record) {
        record.owner == owner;
      }
    ).map(
      func(record) {
        (record.id, record.mainTitle);
      }
    );
  };

  public query ({ caller }) func getGiftPageTitleAndId(giftId : Text) : async (Text, Text) {
    switch (giftPages.get(giftId)) {
      case (?record) { (record.mainTitle, record.id) };
      case (null) { Runtime.trap("No gift page with this ID exists.") };
    };
  };

  public query ({ caller }) func getGiftPage(giftId : Text) : async GiftPage {
    switch (giftPages.get(giftId)) {
      case (?record) { record };
      case (null) { Runtime.trap("No gift page with this ID exists.") };
    };
  };

  public query ({ caller }) func getGiftPages() : async [GiftPage] {
    giftPages.values().toArray().sort();
  };

  public query ({ caller }) func getGiftPagesByOwner(owner : Principal) : async [GiftPage] {
    giftPages.values().toArray().sort().filter(
      func(record) {
        record.owner == owner;
      }
    );
  };

  public shared ({ caller }) func deleteGiftPage(giftId : Text) : async () {
    switch (giftPages.get(giftId)) {
      case (null) { Runtime.trap("Gift page does not exist.") };
      case (?record) {
        if (record.owner != caller) {
          Runtime.trap("Only the page owner can delete this.");
        };
        giftPages.remove(giftId);
      };
    };
  };
};
