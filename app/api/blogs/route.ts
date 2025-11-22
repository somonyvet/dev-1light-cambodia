import {NextRequest, NextResponse} from "next/server";
import {adminDb} from "@lib/firebaseAdmin";

export async function GET(req: NextRequest) {
    try {
        const {searchParams} = new URL(req.url);
        const sizeParam = parseInt(searchParams.get("size") || "25");
        const pageParam = parseInt(searchParams.get("page") || "1");

        const size = isNaN(sizeParam) ? 25 : sizeParam;
        const page = isNaN(pageParam) ? 1 : pageParam;

        const ref = adminDb.collection("blogs")
        const snapshot = await ref.orderBy("createdAt", "desc").offset((page - 1) * size).limit(size).get();
        const totalSnapshot = await ref.get();
        const filteredSnapshot = snapshot.docs.filter(doc => doc.data()["status"] === "published");
        const blogList = filteredSnapshot.map(doc => ({id: doc.id, ...doc.data()}));
        const paging = blogList.length === 0 ? null : {
            size,
            page,
            total: totalSnapshot.docs.length,
            totalPages: Math.trunc(totalSnapshot.docs.length / size) + 1
        }

        return new NextResponse(JSON.stringify({data: blogList, paging}), {
            status: 200,
            headers: {"Content-Type": "application/json"}
        });
    } catch (err) {
        console.log(JSON.stringify(err));
        const error = {
            code: 500,
            message: "Internal server error"
        }
        return new NextResponse(JSON.stringify(error), {status: 500});
    }
}