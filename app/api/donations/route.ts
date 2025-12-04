import {NextRequest, NextResponse} from "next/server";
import {adminDb} from "@lib/firebaseAdmin";
import {DonationProps} from "../../../types/donation";

export async function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const sizeParam = parseInt(searchParams.get("size") || "25");
        const pageParam = parseInt(searchParams.get("page") || "1");

        const size = isNaN(sizeParam) ? 25 : sizeParam;
        const page = isNaN(pageParam) ? 1 : pageParam;

        const ref = adminDb.collection("donations");
        const snapshot = await ref.orderBy("createdDateMs", "desc").offset((page - 1) * size).limit(size).get();
        const totalSnapshot = await ref.get();
        const donationList = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        const data = donationList.map(({id, donorName, amount, currency, type}: any) => ({id, donorName, amount, currency, type}));
        const paging = donationList.length === 0 ? null : {
            size,
            page,
            total: totalSnapshot.docs.length,
            totalPages: Math.ceil(totalSnapshot.docs.length / size)
        }

        return NextResponse.json({
            status: 200,
            data,
            paging
        }, {status: 200})
    } catch (err) {
        console.log(JSON.stringify(err));
        const error = {
            code: 500,
            message: "Internal server error"
        }
        return NextResponse.json({
            status: 500,
            error
        }, {status: 500})
    }
}