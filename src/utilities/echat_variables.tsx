import {
  MdSportsSoccer,
  MdElectricalServices,
  MdHealthAndSafety,
  MdTravelExplore,
  MdSelfImprovement,
} from "react-icons/md";

import { FaMusic, FaBusinessTime } from "react-icons/fa";

import { BsCameraReelsFill } from "react-icons/bs";

import {
  GiNewspaper,
  GiBeamsAura,
  GiInnerSelf,
  GiJourney,
  GiCook,
  GiGiftOfKnowledge,
  GiPublicSpeaker,
  GiThreeLeaves,
  GiLovers,
  GiPrayer,
} from "react-icons/gi";

import { AiTwotoneExperiment } from "react-icons/ai";

import { TbNeedleThread } from "react-icons/tb";

///////////////////////////////////////////////////////////////////////////////////////////
export const all_categories = [
  ["News", <GiNewspaper />],
  ["Sport", <MdSportsSoccer />],
  ["Music", <FaMusic />],
  ["Movie", <BsCameraReelsFill />],
  ["Science", <AiTwotoneExperiment />],
  ["Technology", <MdElectricalServices />],
  ["Art", <GiInnerSelf />],
  ["Fashion", <GiBeamsAura />],
  ["Health", <MdHealthAndSafety />],
  ["Lifestyle", <GiJourney />],
  ["Travel", <MdTravelExplore />],
  ["Food & Cooking", <GiCook />],
  ["Business & Finance", <FaBusinessTime />],
  ["Education", <GiGiftOfKnowledge />],
  ["Politics", <GiPublicSpeaker />],
  ["Environment", <GiThreeLeaves />],
  ["Relationship", <GiLovers />],
  ["Personal Development", <MdSelfImprovement />],
  ["DIY & Crafts", <TbNeedleThread />],
  ["Religion", <GiPrayer />],
];


/// db objects

// user object
// User schema and model
export const userSchemaProps = [
  "fullname",
  "username",
  "username_update",
  "email",
  "password",
  "reset_password_str",
  "reset_password_str_expire",
  "provider",
  "provider_id",
  "verified",
  "image_file",
  "image_url",
  "date_of_birth",
  "bio",
  "following",
  "followers",
  "eChats",
  "bookmarked",
  "liked",
  "notifications",
  "category_interests",
  "theme",
  "created_at"
];
