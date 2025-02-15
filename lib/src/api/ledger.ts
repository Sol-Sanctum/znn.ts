import {Client} from "../client/interfaces";
import {AccountBlock, AccountBlockList} from "../model/nom/account_block";
import {AccountBlockTemplate} from "../model/nom/account_block_template";
import {AccountInfo} from "../model/nom/account_info";
import {DetailedMomentumList} from "../model/nom/detailed_momentum";
import {Momentum, MomentumList} from "../model/nom/momentum";
import {Address} from "../model/primitives/address";
import {Hash} from "../model/primitives/hash";
import {BytesUtils} from "../utils/bytes";
import {rpcMaxPageSize, memoryPoolPageSize} from "./../client/constants";
// import { BigNumber } from "ethers";
// var JSONbig = require("json-bigint")({useNativeBigInt: true});

export class LedgerApi {
  client!: Client;

  setClient(client: Client) {
    this.client = client;
  }

  publishRawTransaction(accountBlockTemplate: AccountBlockTemplate): Promise<any> {
    // console.log("accountBlockTemplate", accountBlockTemplate);

    const jsonedAccountBlockTemplate = accountBlockTemplate.toJson();
    // console.log("jsonedAccountBlockTemplate", jsonedAccountBlockTemplate);
    // jsonedAccountBlockTemplate.amount = BytesUtils.numberOrStringToBytes(accountBlockTemplate.amount.toString()).toJSON().data;
    // console.log("jsonedAccountBlockTemplate 2", jsonedAccountBlockTemplate);

    // jsonedAccountBlockTemplate.amount = ethers.BigNumber.from(accountBlockTemplate.amount.toString());

    // jsonedAccountBlockTemplate.amount = accountBlockTemplate.amount.toString();

    //
    // ToDo: Also replace these where necessary
    //
    //

    // Token:
    //
    // jsonedAccountBlockTemplate.totalSupply = accountBlockTemplate.totalSupply.toString();
    // jsonedAccountBlockTemplate.maxSupply = accountBlockTemplate.maxSupply.toString();

    // BalanceInfoItem
    //
    // balance

    // AccountBlock
    //
    // usedPlasma
    // basePlasma

    // Under embedded
    //
    // Swap
    //
    // qsr
    // znn

    // StakeList
    //
    // totalAmount
    // totalWeightedAmount

    // Plasma
    //
    // qsrAmount

    // Pillar
    //
    // weight

    // common
    //
    // znnAmount
    // qsrAmount

    // Accelerator
    //
    // znnFundsNeeded
    // qsrFundsNeeded

    // jsonedAccountBlockTemplate.difficulty = parseInt(accountBlockTemplate.difficulty.toString());
    // jsonedAccountBlockTemplate.difficulty = accountBlockTemplate.difficulty.toString();
    console.log("jsonedAccountBlockTemplate 3", jsonedAccountBlockTemplate);

    // console.log("JSONbig.stringify(jsonedAccountBlockTemplate)", JSONbig.stringify(jsonedAccountBlockTemplate));

    return this.client.sendRequest("ledger.publishRawTransaction", [jsonedAccountBlockTemplate]);
  }

  async getUnconfirmedBlocksByAddress(
    address: Address,
    pageIndex = 0,
    pageSize = memoryPoolPageSize
  ): Promise<AccountBlockList> {
    let response = await this.client.sendRequest("ledger.getUnconfirmedBlocksByAddress", [
      address.toString(),
      pageIndex,
      pageSize,
    ]);
    return AccountBlockList.fromJson(response);
  }

  async getUnreceivedBlocksByAddress(
    address: Address,
    pageIndex = 0,
    pageSize = memoryPoolPageSize
  ): Promise<AccountBlockList> {
    let response = await this.client.sendRequest("ledger.getUnreceivedBlocksByAddress", [
      address.toString(),
      pageIndex,
      pageSize,
    ]);
    return AccountBlockList.fromJson(response);
  }

  //
  // Account-blocks
  //
  async getFrontierBlock(address?: Address): Promise<AccountBlock | null> {
    let response = await this.client.sendRequest("ledger.getFrontierAccountBlock", [address?.toString()]);
    return response == null ? null : AccountBlock.fromJson(response);
  }

  async getBlockByHash(hash?: Hash): Promise<AccountBlock | null> {
    let response = await this.client.sendRequest("ledger.getAccountBlockByHash", [hash?.toString()]);
    return response == null ? null : AccountBlock.fromJson(response);
  }

  async getBlocksByHeight(address: Address, height = 1, count = rpcMaxPageSize): Promise<AccountBlockList> {
    let response = await this.client.sendRequest("ledger.getAccountBlocksByHeight", [
      address.toString(),
      height,
      count,
    ]);
    return AccountBlockList.fromJson(response);
  }

  async getBlocksByPage(address: Address, pageIndex = 0, pageSize = rpcMaxPageSize): Promise<AccountBlockList> {
    let response = await this.client.sendRequest("ledger.getAccountBlocksByPage", [
      address.toString(),
      pageIndex,
      pageSize,
    ]);
    return AccountBlockList.fromJson(response);
  }

  //
  // Momentums
  //
  async getFrontierMomentum(): Promise<Momentum> {
    let response = await this.client.sendRequest("ledger.getFrontierMomentum", []);
    return Momentum.fromJson(response);
  }

  async getMomentumBeforeTime(time: number): Promise<Momentum | null> {
    let response = await this.client.sendRequest("ledger.getMomentumBeforeTime", [time]);
    return response == null ? null : Momentum.fromJson(response);
  }

  async getMomentumByHash(hash: Hash): Promise<Momentum | null> {
    let response = await this.client.sendRequest("ledger.getMomentumByHash", [hash.toString()]);
    return response == null ? null : Momentum.fromJson(response);
  }

  async getMomentumsByHeight(height: number, count: number): Promise<MomentumList> {
    height = height < 1 ? 1 : height;
    count = count > rpcMaxPageSize ? rpcMaxPageSize : count;
    let response = await this.client.sendRequest("ledger.getMomentumsByHeight", [height, count]);
    return MomentumList.fromJson(response);
  }

  // pageIndex = 0 returns the most recent momentums sorted descending by height
  async getMomentumsByPage(pageIndex: number = 0, pageSize: number = rpcMaxPageSize): Promise<MomentumList> {
    let response = await this.client.sendRequest("ledger.getMomentumsByPage", [pageIndex, pageSize]);
    return MomentumList.fromJson(response);
  }

  async getDetailedMomentumsByHeight(height: number, count: number): Promise<DetailedMomentumList> {
    height = height < 1 ? 1 : height;
    count = count > rpcMaxPageSize ? rpcMaxPageSize : count;
    let response = await this.client.sendRequest("ledger.getDetailedMomentumsByHeight", [height, count]);
    return DetailedMomentumList.fromJson(response);
  }

  //
  // Account info
  //
  async getAccountInfoByAddress(address: Address): Promise<any> {
    let response = await this.client.sendRequest("ledger.getAccountInfoByAddress", [address.toString()]);
    // console.log("response getAccountInfoByAddress", response);
    return AccountInfo.fromJson(response);
  }
}
